namespace KMHSSS
{
    partial class Student_Bill_Summary_Details_Frm
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
            this.Close_Btn = new System.Windows.Forms.Button();
            this.Student_Bill_Summary_Details_dataGridView1 = new System.Windows.Forms.DataGridView();
            this.SNo = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.EYear_Txt = new System.Windows.Forms.TextBox();
            this.SYear_CBox = new System.Windows.Forms.ComboBox();
            this.Class_CBox = new System.Windows.Forms.ComboBox();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.Alert_Msg_Lbl = new System.Windows.Forms.Label();
            this.groupBox4 = new System.Windows.Forms.GroupBox();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.View_Btn = new System.Windows.Forms.Button();
            this.Bill_Type_CBox = new System.Windows.Forms.ComboBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label13 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.Sec_CBox = new System.Windows.Forms.ComboBox();
            this.label6 = new System.Windows.Forms.Label();
            this.Student_Name_CBox = new System.Windows.Forms.ComboBox();
            this.Admis_No_Txt = new System.Windows.Forms.TextBox();
            this.label10 = new System.Windows.Forms.Label();
            this.label14 = new System.Windows.Forms.Label();
            this.label9 = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.Student_Bill_Summary_Details_dataGridView1)).BeginInit();
            this.groupBox1.SuspendLayout();
            this.groupBox4.SuspendLayout();
            this.groupBox3.SuspendLayout();
            this.SuspendLayout();
            // 
            // Close_Btn
            // 
            this.Close_Btn.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Close_Btn.Location = new System.Drawing.Point(1172, 22);
            this.Close_Btn.Margin = new System.Windows.Forms.Padding(4);
            this.Close_Btn.Name = "Close_Btn";
            this.Close_Btn.Size = new System.Drawing.Size(95, 57);
            this.Close_Btn.TabIndex = 8;
            this.Close_Btn.Text = "Close";
            this.Close_Btn.UseVisualStyleBackColor = true;
            this.Close_Btn.Click += new System.EventHandler(this.Close_Btn_Click);
            // 
            // Student_Bill_Summary_Details_dataGridView1
            // 
            this.Student_Bill_Summary_Details_dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.Student_Bill_Summary_Details_dataGridView1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.SNo});
            this.Student_Bill_Summary_Details_dataGridView1.Location = new System.Drawing.Point(37, 33);
            this.Student_Bill_Summary_Details_dataGridView1.Margin = new System.Windows.Forms.Padding(4);
            this.Student_Bill_Summary_Details_dataGridView1.Name = "Student_Bill_Summary_Details_dataGridView1";
            this.Student_Bill_Summary_Details_dataGridView1.Size = new System.Drawing.Size(1212, 426);
            this.Student_Bill_Summary_Details_dataGridView1.TabIndex = 0;
            this.Student_Bill_Summary_Details_dataGridView1.VirtualMode = true;
            this.Student_Bill_Summary_Details_dataGridView1.CellValueNeeded += new System.Windows.Forms.DataGridViewCellValueEventHandler(this.Student_Bill_Summary_Details_dataGridView1_CellValueNeeded);
            // 
            // SNo
            // 
            this.SNo.HeaderText = "SNo";
            this.SNo.Name = "SNo";
            this.SNo.ReadOnly = true;
            // 
            // EYear_Txt
            // 
            this.EYear_Txt.Enabled = false;
            this.EYear_Txt.ForeColor = System.Drawing.Color.Black;
            this.EYear_Txt.Location = new System.Drawing.Point(149, 37);
            this.EYear_Txt.Name = "EYear_Txt";
            this.EYear_Txt.Size = new System.Drawing.Size(70, 28);
            this.EYear_Txt.TabIndex = 2;
            // 
            // SYear_CBox
            // 
            this.SYear_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.SYear_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.SYear_CBox.FormattingEnabled = true;
            this.SYear_CBox.Location = new System.Drawing.Point(69, 36);
            this.SYear_CBox.Name = "SYear_CBox";
            this.SYear_CBox.Size = new System.Drawing.Size(72, 29);
            this.SYear_CBox.TabIndex = 3;
            this.SYear_CBox.SelectedIndexChanged += new System.EventHandler(this.SYear_CBox_SelectedIndexChanged);
            this.SYear_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.SYear_CBox_KeyDown);
            // 
            // Class_CBox
            // 
            this.Class_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Class_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Class_CBox.FormattingEnabled = true;
            this.Class_CBox.Location = new System.Drawing.Point(280, 35);
            this.Class_CBox.Name = "Class_CBox";
            this.Class_CBox.Size = new System.Drawing.Size(73, 29);
            this.Class_CBox.TabIndex = 3;
            this.Class_CBox.SelectedIndexChanged += new System.EventHandler(this.Class_CBox_SelectedIndexChanged);
            this.Class_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Class_CBox_KeyDown);
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.Alert_Msg_Lbl);
            this.groupBox1.Controls.Add(this.groupBox4);
            this.groupBox1.Controls.Add(this.groupBox3);
            this.groupBox1.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.Location = new System.Drawing.Point(24, 41);
            this.groupBox1.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Padding = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.groupBox1.Size = new System.Drawing.Size(1320, 648);
            this.groupBox1.TabIndex = 227;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Student Bill Summary Details";
            // 
            // Alert_Msg_Lbl
            // 
            this.Alert_Msg_Lbl.AutoSize = true;
            this.Alert_Msg_Lbl.Font = new System.Drawing.Font("Comic Sans MS", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Alert_Msg_Lbl.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.Alert_Msg_Lbl.Location = new System.Drawing.Point(581, 616);
            this.Alert_Msg_Lbl.Name = "Alert_Msg_Lbl";
            this.Alert_Msg_Lbl.Size = new System.Drawing.Size(124, 23);
            this.Alert_Msg_Lbl.TabIndex = 269;
            this.Alert_Msg_Lbl.Text = "Alert Message";
            // 
            // groupBox4
            // 
            this.groupBox4.Controls.Add(this.Student_Bill_Summary_Details_dataGridView1);
            this.groupBox4.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox4.Location = new System.Drawing.Point(25, 125);
            this.groupBox4.Margin = new System.Windows.Forms.Padding(4);
            this.groupBox4.Name = "groupBox4";
            this.groupBox4.Padding = new System.Windows.Forms.Padding(4);
            this.groupBox4.Size = new System.Drawing.Size(1273, 482);
            this.groupBox4.TabIndex = 226;
            this.groupBox4.TabStop = false;
            this.groupBox4.Text = "View";
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.View_Btn);
            this.groupBox3.Controls.Add(this.Bill_Type_CBox);
            this.groupBox3.Controls.Add(this.label1);
            this.groupBox3.Controls.Add(this.EYear_Txt);
            this.groupBox3.Controls.Add(this.Close_Btn);
            this.groupBox3.Controls.Add(this.SYear_CBox);
            this.groupBox3.Controls.Add(this.Class_CBox);
            this.groupBox3.Controls.Add(this.label13);
            this.groupBox3.Controls.Add(this.label5);
            this.groupBox3.Controls.Add(this.Sec_CBox);
            this.groupBox3.Controls.Add(this.label6);
            this.groupBox3.Controls.Add(this.Student_Name_CBox);
            this.groupBox3.Controls.Add(this.Admis_No_Txt);
            this.groupBox3.Controls.Add(this.label10);
            this.groupBox3.Controls.Add(this.label14);
            this.groupBox3.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox3.Location = new System.Drawing.Point(24, 28);
            this.groupBox3.Margin = new System.Windows.Forms.Padding(4);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Padding = new System.Windows.Forms.Padding(4);
            this.groupBox3.Size = new System.Drawing.Size(1275, 89);
            this.groupBox3.TabIndex = 14;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "Student Details";
            // 
            // View_Btn
            // 
            this.View_Btn.Location = new System.Drawing.Point(1172, 24);
            this.View_Btn.Margin = new System.Windows.Forms.Padding(4);
            this.View_Btn.Name = "View_Btn";
            this.View_Btn.Size = new System.Drawing.Size(95, 57);
            this.View_Btn.TabIndex = 235;
            this.View_Btn.Text = "View";
            this.View_Btn.UseVisualStyleBackColor = true;
            this.View_Btn.Click += new System.EventHandler(this.View_Btn_Click);
            // 
            // Bill_Type_CBox
            // 
            this.Bill_Type_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Bill_Type_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Bill_Type_CBox.FormattingEnabled = true;
            this.Bill_Type_CBox.Items.AddRange(new object[] {
            "SCHOOL BILL",
            "HOSTEL BILL",
            "VAN BILL",
            "STATIONARY BILL",
            "OTHER SCHOOL BILL",
            "OTHER HOSTEL BILL"});
            this.Bill_Type_CBox.Location = new System.Drawing.Point(996, 33);
            this.Bill_Type_CBox.Name = "Bill_Type_CBox";
            this.Bill_Type_CBox.Size = new System.Drawing.Size(165, 29);
            this.Bill_Type_CBox.TabIndex = 7;
            this.Bill_Type_CBox.SelectedIndexChanged += new System.EventHandler(this.Bill_Type_CBox_SelectedIndexChanged);
            this.Bill_Type_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Bill_Type_CBox_KeyDown);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(919, 37);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(72, 21);
            this.label1.TabIndex = 234;
            this.label1.Text = "Bill Type";
            // 
            // label13
            // 
            this.label13.AutoSize = true;
            this.label13.Location = new System.Drawing.Point(230, 39);
            this.label13.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(45, 21);
            this.label13.TabIndex = 213;
            this.label13.Text = "Class";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(11, 40);
            this.label5.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(54, 21);
            this.label5.TabIndex = 232;
            this.label5.Text = "AYear";
            // 
            // Sec_CBox
            // 
            this.Sec_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Sec_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Sec_CBox.FormattingEnabled = true;
            this.Sec_CBox.Location = new System.Drawing.Point(404, 35);
            this.Sec_CBox.Name = "Sec_CBox";
            this.Sec_CBox.Size = new System.Drawing.Size(63, 29);
            this.Sec_CBox.TabIndex = 4;
            this.Sec_CBox.SelectedIndexChanged += new System.EventHandler(this.Sec_CBox_SelectedIndexChanged);
            this.Sec_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Sec_CBox_KeyDown);
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(361, 39);
            this.label6.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(36, 21);
            this.label6.TabIndex = 220;
            this.label6.Text = "Sec";
            // 
            // Student_Name_CBox
            // 
            this.Student_Name_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Student_Name_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Student_Name_CBox.FormattingEnabled = true;
            this.Student_Name_CBox.Location = new System.Drawing.Point(560, 33);
            this.Student_Name_CBox.Name = "Student_Name_CBox";
            this.Student_Name_CBox.Size = new System.Drawing.Size(163, 29);
            this.Student_Name_CBox.TabIndex = 5;
            this.Student_Name_CBox.SelectedIndexChanged += new System.EventHandler(this.Student_Name_CBox_SelectedIndexChanged);
            this.Student_Name_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Student_Name_CBox_KeyDown);
            // 
            // Admis_No_Txt
            // 
            this.Admis_No_Txt.Enabled = false;
            this.Admis_No_Txt.Location = new System.Drawing.Point(820, 34);
            this.Admis_No_Txt.Margin = new System.Windows.Forms.Padding(4);
            this.Admis_No_Txt.Name = "Admis_No_Txt";
            this.Admis_No_Txt.Size = new System.Drawing.Size(93, 28);
            this.Admis_No_Txt.TabIndex = 6;
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.Location = new System.Drawing.Point(731, 37);
            this.label10.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(80, 21);
            this.label10.TabIndex = 216;
            this.label10.Text = "Admis No";
            // 
            // label14
            // 
            this.label14.AutoSize = true;
            this.label14.Location = new System.Drawing.Point(474, 38);
            this.label14.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label14.Name = "label14";
            this.label14.Size = new System.Drawing.Size(83, 21);
            this.label14.TabIndex = 214;
            this.label14.Text = "Std Name";
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label9.Location = new System.Drawing.Point(569, 11);
            this.label9.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(284, 27);
            this.label9.TabIndex = 228;
            this.label9.Text = "Student Bill Summary Details";
            // 
            // Student_Bill_Summary_Details_Frm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.SteelBlue;
            this.CancelButton = this.Close_Btn;
            this.ClientSize = new System.Drawing.Size(1366, 746);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.label9);
            this.Name = "Student_Bill_Summary_Details_Frm";
            this.Text = "Student Bill Summary Details";
            this.Load += new System.EventHandler(this.Student_Wise_Bill_History_Frm_Load);
            ((System.ComponentModel.ISupportInitialize)(this.Student_Bill_Summary_Details_dataGridView1)).EndInit();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox4.ResumeLayout(false);
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button Close_Btn;
        private System.Windows.Forms.DataGridView Student_Bill_Summary_Details_dataGridView1;
        private System.Windows.Forms.TextBox EYear_Txt;
        private System.Windows.Forms.ComboBox SYear_CBox;
        private System.Windows.Forms.ComboBox Class_CBox;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.GroupBox groupBox4;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.Label label13;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.ComboBox Sec_CBox;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.ComboBox Student_Name_CBox;
        private System.Windows.Forms.TextBox Admis_No_Txt;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.Label label14;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.ComboBox Bill_Type_CBox;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.DataGridViewTextBoxColumn SNo;
        private System.Windows.Forms.Button View_Btn;
        private System.Windows.Forms.Label Alert_Msg_Lbl;
    }
}