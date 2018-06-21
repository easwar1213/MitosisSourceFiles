namespace KMHSSS
{
    partial class Academy_Year_Wise_Student_Details_Frm
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
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.EYear_Txt = new System.Windows.Forms.TextBox();
            this.View_Btn = new System.Windows.Forms.Button();
            this.SYear_CBox = new System.Windows.Forms.ComboBox();
            this.Class_CBox = new System.Windows.Forms.ComboBox();
            this.Sec_CBox = new System.Windows.Forms.ComboBox();
            this.label6 = new System.Windows.Forms.Label();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.groupBox4 = new System.Windows.Forms.GroupBox();
            this.Academy_Year_Wise_Student_Details_dataGridView1 = new System.Windows.Forms.DataGridView();
            this.label9 = new System.Windows.Forms.Label();
            this.AYear_CHBox = new System.Windows.Forms.CheckBox();
            this.label2 = new System.Windows.Forms.Label();
            this.Class_CHBox = new System.Windows.Forms.CheckBox();
            this.label13 = new System.Windows.Forms.Label();
            this.groupBox3.SuspendLayout();
            this.groupBox1.SuspendLayout();
            this.groupBox4.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.Academy_Year_Wise_Student_Details_dataGridView1)).BeginInit();
            this.SuspendLayout();
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.Class_CHBox);
            this.groupBox3.Controls.Add(this.label13);
            this.groupBox3.Controls.Add(this.AYear_CHBox);
            this.groupBox3.Controls.Add(this.label2);
            this.groupBox3.Controls.Add(this.EYear_Txt);
            this.groupBox3.Controls.Add(this.View_Btn);
            this.groupBox3.Controls.Add(this.SYear_CBox);
            this.groupBox3.Controls.Add(this.Class_CBox);
            this.groupBox3.Controls.Add(this.Sec_CBox);
            this.groupBox3.Controls.Add(this.label6);
            this.groupBox3.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox3.Location = new System.Drawing.Point(92, 27);
            this.groupBox3.Margin = new System.Windows.Forms.Padding(4);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Padding = new System.Windows.Forms.Padding(4);
            this.groupBox3.Size = new System.Drawing.Size(1093, 106);
            this.groupBox3.TabIndex = 14;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "Student Details";
            // 
            // EYear_Txt
            // 
            this.EYear_Txt.Enabled = false;
            this.EYear_Txt.ForeColor = System.Drawing.Color.Black;
            this.EYear_Txt.Location = new System.Drawing.Point(250, 43);
            this.EYear_Txt.Name = "EYear_Txt";
            this.EYear_Txt.Size = new System.Drawing.Size(121, 28);
            this.EYear_Txt.TabIndex = 2;
            // 
            // View_Btn
            // 
            this.View_Btn.Location = new System.Drawing.Point(952, 24);
            this.View_Btn.Margin = new System.Windows.Forms.Padding(4);
            this.View_Btn.Name = "View_Btn";
            this.View_Btn.Size = new System.Drawing.Size(101, 64);
            this.View_Btn.TabIndex = 14;
            this.View_Btn.Text = "View";
            this.View_Btn.UseVisualStyleBackColor = true;
            this.View_Btn.Click += new System.EventHandler(this.View_Btn_Click);
            // 
            // SYear_CBox
            // 
            this.SYear_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.SYear_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.SYear_CBox.FormattingEnabled = true;
            this.SYear_CBox.Location = new System.Drawing.Point(134, 42);
            this.SYear_CBox.Name = "SYear_CBox";
            this.SYear_CBox.Size = new System.Drawing.Size(111, 29);
            this.SYear_CBox.TabIndex = 3;
            this.SYear_CBox.SelectedIndexChanged += new System.EventHandler(this.SYear_CBox_SelectedIndexChanged);
            this.SYear_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.SYear_CBox_KeyDown);
            // 
            // Class_CBox
            // 
            this.Class_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Class_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Class_CBox.FormattingEnabled = true;
            this.Class_CBox.Location = new System.Drawing.Point(490, 42);
            this.Class_CBox.Name = "Class_CBox";
            this.Class_CBox.Size = new System.Drawing.Size(154, 29);
            this.Class_CBox.TabIndex = 5;
            this.Class_CBox.SelectedIndexChanged += new System.EventHandler(this.Class_CBox_SelectedIndexChanged);
            this.Class_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Class_CBox_KeyDown);
            // 
            // Sec_CBox
            // 
            this.Sec_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Sec_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Sec_CBox.FormattingEnabled = true;
            this.Sec_CBox.Location = new System.Drawing.Point(735, 43);
            this.Sec_CBox.Name = "Sec_CBox";
            this.Sec_CBox.Size = new System.Drawing.Size(181, 29);
            this.Sec_CBox.TabIndex = 6;
            this.Sec_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Sec_CBox_KeyDown);
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(658, 47);
            this.label6.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(63, 21);
            this.label6.TabIndex = 220;
            this.label6.Text = "Section";
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.groupBox3);
            this.groupBox1.Controls.Add(this.groupBox4);
            this.groupBox1.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.Location = new System.Drawing.Point(28, 46);
            this.groupBox1.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Padding = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.groupBox1.Size = new System.Drawing.Size(1301, 638);
            this.groupBox1.TabIndex = 226;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Student Contact Details";
            // 
            // groupBox4
            // 
            this.groupBox4.Controls.Add(this.Academy_Year_Wise_Student_Details_dataGridView1);
            this.groupBox4.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox4.Location = new System.Drawing.Point(37, 149);
            this.groupBox4.Margin = new System.Windows.Forms.Padding(4);
            this.groupBox4.Name = "groupBox4";
            this.groupBox4.Padding = new System.Windows.Forms.Padding(4);
            this.groupBox4.Size = new System.Drawing.Size(1225, 451);
            this.groupBox4.TabIndex = 228;
            this.groupBox4.TabStop = false;
            this.groupBox4.Text = "View";
            // 
            // Academy_Year_Wise_Student_Details_dataGridView1
            // 
            this.Academy_Year_Wise_Student_Details_dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.Academy_Year_Wise_Student_Details_dataGridView1.Location = new System.Drawing.Point(38, 27);
            this.Academy_Year_Wise_Student_Details_dataGridView1.Margin = new System.Windows.Forms.Padding(4);
            this.Academy_Year_Wise_Student_Details_dataGridView1.Name = "Academy_Year_Wise_Student_Details_dataGridView1";
            this.Academy_Year_Wise_Student_Details_dataGridView1.Size = new System.Drawing.Size(1150, 392);
            this.Academy_Year_Wise_Student_Details_dataGridView1.TabIndex = 0;
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label9.Location = new System.Drawing.Point(496, 11);
            this.label9.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(352, 27);
            this.label9.TabIndex = 227;
            this.label9.Text = "Academy Year Wise Student Details";
            // 
            // AYear_CHBox
            // 
            this.AYear_CHBox.AutoSize = true;
            this.AYear_CHBox.Checked = true;
            this.AYear_CHBox.CheckState = System.Windows.Forms.CheckState.Checked;
            this.AYear_CHBox.Location = new System.Drawing.Point(41, 51);
            this.AYear_CHBox.Name = "AYear_CHBox";
            this.AYear_CHBox.Size = new System.Drawing.Size(15, 14);
            this.AYear_CHBox.TabIndex = 262;
            this.AYear_CHBox.UseVisualStyleBackColor = true;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(62, 47);
            this.label2.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(54, 21);
            this.label2.TabIndex = 261;
            this.label2.Text = "AYear";
            // 
            // Class_CHBox
            // 
            this.Class_CHBox.AutoSize = true;
            this.Class_CHBox.Location = new System.Drawing.Point(406, 51);
            this.Class_CHBox.Name = "Class_CHBox";
            this.Class_CHBox.Size = new System.Drawing.Size(15, 14);
            this.Class_CHBox.TabIndex = 264;
            this.Class_CHBox.UseVisualStyleBackColor = true;
            // 
            // label13
            // 
            this.label13.AutoSize = true;
            this.label13.Location = new System.Drawing.Point(431, 47);
            this.label13.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(45, 21);
            this.label13.TabIndex = 263;
            this.label13.Text = "Class";
            // 
            // Academy_Year_Wise_Student_Details_Frm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.SteelBlue;
            this.ClientSize = new System.Drawing.Size(1366, 746);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.label9);
            this.Name = "Academy_Year_Wise_Student_Details_Frm";
            this.Text = "Academy Year Wise Student Details";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.Load += new System.EventHandler(this.Academy_Year_Wise_Student_Details_Frm_Load);
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            this.groupBox1.ResumeLayout(false);
            this.groupBox4.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.Academy_Year_Wise_Student_Details_dataGridView1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.ComboBox SYear_CBox;
        private System.Windows.Forms.ComboBox Class_CBox;
        private System.Windows.Forms.ComboBox Sec_CBox;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Button View_Btn;
        private System.Windows.Forms.DataGridView Academy_Year_Wise_Student_Details_dataGridView1;
        private System.Windows.Forms.GroupBox groupBox4;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.TextBox EYear_Txt;
        private System.Windows.Forms.CheckBox AYear_CHBox;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.CheckBox Class_CHBox;
        private System.Windows.Forms.Label label13;
    }
}