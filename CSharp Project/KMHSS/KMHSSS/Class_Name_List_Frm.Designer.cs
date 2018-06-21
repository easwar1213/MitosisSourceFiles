namespace KMHSSS
{
    partial class Class_Name_List_Frm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.EYear_Txt = new System.Windows.Forms.TextBox();
            this.SYear_CBox = new System.Windows.Forms.ComboBox();
            this.label1 = new System.Windows.Forms.Label();
            this.panel1 = new System.Windows.Forms.Panel();
            this.Print_Btn = new System.Windows.Forms.Button();
            this.Sec_CBox = new System.Windows.Forms.ComboBox();
            this.Class_CBox = new System.Windows.Forms.ComboBox();
            this.View_Btn = new System.Windows.Forms.Button();
            this.label13 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.Class_Name_List_dataGridView1 = new System.Windows.Forms.DataGridView();
            this.SNo = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.label9 = new System.Windows.Forms.Label();
            this.AYear_CHBox = new System.Windows.Forms.CheckBox();
            this.Class_CHBox = new System.Windows.Forms.CheckBox();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.panel1.SuspendLayout();
            this.groupBox3.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.Class_Name_List_dataGridView1)).BeginInit();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.groupBox2);
            this.groupBox1.Controls.Add(this.groupBox3);
            this.groupBox1.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.Location = new System.Drawing.Point(36, 45);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(1004, 558);
            this.groupBox1.TabIndex = 26;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Class Name List Details";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.Class_CHBox);
            this.groupBox2.Controls.Add(this.AYear_CHBox);
            this.groupBox2.Controls.Add(this.EYear_Txt);
            this.groupBox2.Controls.Add(this.SYear_CBox);
            this.groupBox2.Controls.Add(this.label1);
            this.groupBox2.Controls.Add(this.panel1);
            this.groupBox2.Controls.Add(this.Sec_CBox);
            this.groupBox2.Controls.Add(this.Class_CBox);
            this.groupBox2.Controls.Add(this.View_Btn);
            this.groupBox2.Controls.Add(this.label13);
            this.groupBox2.Controls.Add(this.label5);
            this.groupBox2.Location = new System.Drawing.Point(44, 29);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(928, 88);
            this.groupBox2.TabIndex = 8;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Select";
            // 
            // EYear_Txt
            // 
            this.EYear_Txt.Enabled = false;
            this.EYear_Txt.ForeColor = System.Drawing.Color.Black;
            this.EYear_Txt.Location = new System.Drawing.Point(194, 33);
            this.EYear_Txt.Name = "EYear_Txt";
            this.EYear_Txt.Size = new System.Drawing.Size(82, 28);
            this.EYear_Txt.TabIndex = 233;
            // 
            // SYear_CBox
            // 
            this.SYear_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.SYear_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.SYear_CBox.FormattingEnabled = true;
            this.SYear_CBox.Location = new System.Drawing.Point(96, 32);
            this.SYear_CBox.Name = "SYear_CBox";
            this.SYear_CBox.Size = new System.Drawing.Size(88, 29);
            this.SYear_CBox.TabIndex = 234;
            this.SYear_CBox.SelectedIndexChanged += new System.EventHandler(this.SYear_CBox_SelectedIndexChanged);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(35, 36);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(54, 21);
            this.label1.TabIndex = 235;
            this.label1.Text = "AYear";
            // 
            // panel1
            // 
            this.panel1.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
            this.panel1.Controls.Add(this.Print_Btn);
            this.panel1.Location = new System.Drawing.Point(787, 20);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(114, 58);
            this.panel1.TabIndex = 61;
            // 
            // Print_Btn
            // 
            this.Print_Btn.Location = new System.Drawing.Point(8, 6);
            this.Print_Btn.Margin = new System.Windows.Forms.Padding(4);
            this.Print_Btn.Name = "Print_Btn";
            this.Print_Btn.Size = new System.Drawing.Size(92, 43);
            this.Print_Btn.TabIndex = 3;
            this.Print_Btn.Text = "Print";
            this.Print_Btn.UseVisualStyleBackColor = true;
            this.Print_Btn.Click += new System.EventHandler(this.Print_Btn_Click);
            // 
            // Sec_CBox
            // 
            this.Sec_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Sec_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Sec_CBox.FormattingEnabled = true;
            this.Sec_CBox.Location = new System.Drawing.Point(562, 31);
            this.Sec_CBox.Name = "Sec_CBox";
            this.Sec_CBox.Size = new System.Drawing.Size(95, 29);
            this.Sec_CBox.TabIndex = 2;
            this.Sec_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Sec_CBox_KeyDown);
            // 
            // Class_CBox
            // 
            this.Class_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Class_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Class_CBox.FormattingEnabled = true;
            this.Class_CBox.Location = new System.Drawing.Point(389, 33);
            this.Class_CBox.Name = "Class_CBox";
            this.Class_CBox.Size = new System.Drawing.Size(97, 29);
            this.Class_CBox.TabIndex = 1;
            this.Class_CBox.SelectedIndexChanged += new System.EventHandler(this.Class_CBox_SelectedIndexChanged);
            this.Class_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Class_CBox_KeyDown);
            // 
            // View_Btn
            // 
            this.View_Btn.Location = new System.Drawing.Point(689, 23);
            this.View_Btn.Name = "View_Btn";
            this.View_Btn.Size = new System.Drawing.Size(84, 48);
            this.View_Btn.TabIndex = 3;
            this.View_Btn.Text = "View";
            this.View_Btn.UseVisualStyleBackColor = true;
            this.View_Btn.Click += new System.EventHandler(this.View_Btn_Click);
            // 
            // label13
            // 
            this.label13.AutoSize = true;
            this.label13.Location = new System.Drawing.Point(326, 37);
            this.label13.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(45, 21);
            this.label13.TabIndex = 60;
            this.label13.Text = "Class";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(491, 37);
            this.label5.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(63, 21);
            this.label5.TabIndex = 59;
            this.label5.Text = "Section";
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.Class_Name_List_dataGridView1);
            this.groupBox3.Location = new System.Drawing.Point(44, 123);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(928, 404);
            this.groupBox3.TabIndex = 9;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "View";
            // 
            // Class_Name_List_dataGridView1
            // 
            this.Class_Name_List_dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.Class_Name_List_dataGridView1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.SNo});
            this.Class_Name_List_dataGridView1.Location = new System.Drawing.Point(40, 38);
            this.Class_Name_List_dataGridView1.Name = "Class_Name_List_dataGridView1";
            this.Class_Name_List_dataGridView1.Size = new System.Drawing.Size(851, 335);
            this.Class_Name_List_dataGridView1.TabIndex = 6;
            this.Class_Name_List_dataGridView1.VirtualMode = true;
            this.Class_Name_List_dataGridView1.CellValueNeeded += new System.Windows.Forms.DataGridViewCellValueEventHandler(this.Class_Name_List_dataGridView1_CellValueNeeded);
            // 
            // SNo
            // 
            this.SNo.HeaderText = "SNo";
            this.SNo.Name = "SNo";
            this.SNo.ReadOnly = true;
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label9.Location = new System.Drawing.Point(481, 12);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(231, 27);
            this.label9.TabIndex = 27;
            this.label9.Text = "Class Name List Details";
            // 
            // AYear_CHBox
            // 
            this.AYear_CHBox.AutoSize = true;
            this.AYear_CHBox.Checked = true;
            this.AYear_CHBox.CheckState = System.Windows.Forms.CheckState.Checked;
            this.AYear_CHBox.Location = new System.Drawing.Point(13, 40);
            this.AYear_CHBox.Name = "AYear_CHBox";
            this.AYear_CHBox.Size = new System.Drawing.Size(15, 14);
            this.AYear_CHBox.TabIndex = 261;
            this.AYear_CHBox.UseVisualStyleBackColor = true;
            this.AYear_CHBox.CheckedChanged += new System.EventHandler(this.AYear_CHBox_CheckedChanged);
            // 
            // Class_CHBox
            // 
            this.Class_CHBox.AutoSize = true;
            this.Class_CHBox.Location = new System.Drawing.Point(304, 41);
            this.Class_CHBox.Name = "Class_CHBox";
            this.Class_CHBox.Size = new System.Drawing.Size(15, 14);
            this.Class_CHBox.TabIndex = 262;
            this.Class_CHBox.UseVisualStyleBackColor = true;
            this.Class_CHBox.CheckedChanged += new System.EventHandler(this.Class_CHBox_CheckedChanged);
            // 
            // Class_Name_List_Frm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.SteelBlue;
            this.ClientSize = new System.Drawing.Size(1077, 633);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.label9);
            this.Name = "Class_Name_List_Frm";
            this.Text = "Class Name List Details";
            this.Load += new System.EventHandler(this.Class_Name_List_Frm_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.panel1.ResumeLayout(false);
            this.groupBox3.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.Class_Name_List_dataGridView1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.ComboBox Sec_CBox;
        private System.Windows.Forms.ComboBox Class_CBox;
        private System.Windows.Forms.Button View_Btn;
        private System.Windows.Forms.Label label13;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.DataGridView Class_Name_List_dataGridView1;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.DataGridViewTextBoxColumn SNo;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Button Print_Btn;
        private System.Windows.Forms.TextBox EYear_Txt;
        private System.Windows.Forms.ComboBox SYear_CBox;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.CheckBox AYear_CHBox;
        private System.Windows.Forms.CheckBox Class_CHBox;
    }
}