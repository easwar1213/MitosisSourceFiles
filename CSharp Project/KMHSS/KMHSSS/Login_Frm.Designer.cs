namespace KMHSSS
{
    partial class Login_Frm
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
            this.Login_Type_CBox = new System.Windows.Forms.ComboBox();
            this.label3 = new System.Windows.Forms.Label();
            this.Cancel_Btn = new System.Windows.Forms.Button();
            this.Login_Btn = new System.Windows.Forms.Button();
            this.Pwd_Txt = new System.Windows.Forms.TextBox();
            this.Uname_Txt = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.groupBox1.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.Login_Type_CBox);
            this.groupBox1.Controls.Add(this.label3);
            this.groupBox1.Controls.Add(this.Cancel_Btn);
            this.groupBox1.Controls.Add(this.Login_Btn);
            this.groupBox1.Controls.Add(this.Pwd_Txt);
            this.groupBox1.Controls.Add(this.Uname_Txt);
            this.groupBox1.Controls.Add(this.label2);
            this.groupBox1.Controls.Add(this.label1);
            this.groupBox1.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.ForeColor = System.Drawing.SystemColors.MenuText;
            this.groupBox1.Location = new System.Drawing.Point(28, 23);
            this.groupBox1.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Padding = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.groupBox1.Size = new System.Drawing.Size(415, 242);
            this.groupBox1.TabIndex = 6;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Login";
            // 
            // Login_Type_CBox
            // 
            this.Login_Type_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Login_Type_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Login_Type_CBox.FormattingEnabled = true;
            this.Login_Type_CBox.Items.AddRange(new object[] {
            "Admin",
            "Staff"});
            this.Login_Type_CBox.Location = new System.Drawing.Point(188, 131);
            this.Login_Type_CBox.Name = "Login_Type_CBox";
            this.Login_Type_CBox.Size = new System.Drawing.Size(185, 29);
            this.Login_Type_CBox.TabIndex = 3;
            this.Login_Type_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Login_Type_CBox_KeyDown);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label3.Location = new System.Drawing.Point(38, 133);
            this.label3.Margin = new System.Windows.Forms.Padding(5, 0, 5, 0);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(87, 21);
            this.label3.TabIndex = 5;
            this.label3.Text = "Login Type";
            // 
            // Cancel_Btn
            // 
            this.Cancel_Btn.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Cancel_Btn.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Cancel_Btn.Location = new System.Drawing.Point(236, 180);
            this.Cancel_Btn.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.Cancel_Btn.Name = "Cancel_Btn";
            this.Cancel_Btn.Size = new System.Drawing.Size(92, 37);
            this.Cancel_Btn.TabIndex = 5;
            this.Cancel_Btn.Text = "Cancel";
            this.Cancel_Btn.UseVisualStyleBackColor = true;
            this.Cancel_Btn.Click += new System.EventHandler(this.Cancel_Btn_Click);
            // 
            // Login_Btn
            // 
            this.Login_Btn.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Login_Btn.Location = new System.Drawing.Point(72, 180);
            this.Login_Btn.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.Login_Btn.Name = "Login_Btn";
            this.Login_Btn.Size = new System.Drawing.Size(92, 37);
            this.Login_Btn.TabIndex = 4;
            this.Login_Btn.Text = "Login";
            this.Login_Btn.UseVisualStyleBackColor = true;
            this.Login_Btn.Click += new System.EventHandler(this.Login_Btn_Click);
            // 
            // Pwd_Txt
            // 
            this.Pwd_Txt.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Pwd_Txt.Location = new System.Drawing.Point(188, 82);
            this.Pwd_Txt.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.Pwd_Txt.MaxLength = 30;
            this.Pwd_Txt.Name = "Pwd_Txt";
            this.Pwd_Txt.PasswordChar = '*';
            this.Pwd_Txt.Size = new System.Drawing.Size(185, 28);
            this.Pwd_Txt.TabIndex = 2;
            this.Pwd_Txt.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Pwd_Txt_KeyDown);
            // 
            // Uname_Txt
            // 
            this.Uname_Txt.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Uname_Txt.Location = new System.Drawing.Point(188, 35);
            this.Uname_Txt.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.Uname_Txt.MaxLength = 20;
            this.Uname_Txt.Name = "Uname_Txt";
            this.Uname_Txt.Size = new System.Drawing.Size(185, 28);
            this.Uname_Txt.TabIndex = 1;
            this.Uname_Txt.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Uname_Txt_KeyDown);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.Location = new System.Drawing.Point(38, 83);
            this.label2.Margin = new System.Windows.Forms.Padding(5, 0, 5, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(74, 21);
            this.label2.TabIndex = 1;
            this.label2.Text = "Password";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(36, 35);
            this.label1.Margin = new System.Windows.Forms.Padding(5, 0, 5, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(90, 21);
            this.label1.TabIndex = 0;
            this.label1.Text = "User Name";
            // 
            // Login_Frm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.SteelBlue;
            this.CancelButton = this.Cancel_Btn;
            this.ClientSize = new System.Drawing.Size(470, 294);
            this.Controls.Add(this.groupBox1);
            this.Name = "Login_Frm";
            this.Text = "Login Form";
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Button Cancel_Btn;
        private System.Windows.Forms.Button Login_Btn;
        private System.Windows.Forms.TextBox Pwd_Txt;
        private System.Windows.Forms.TextBox Uname_Txt;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.ComboBox Login_Type_CBox;
    }
}